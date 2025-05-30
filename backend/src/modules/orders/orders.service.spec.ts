import { OrdersRepositoryAbstract } from 'src/contracts/orders-repository.abstract';
import { OrdersService } from './orders.service';
import { Order } from 'src/models/order.model';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: OrdersRepositoryAbstract;

  const mockOrder: Order = {
    id: 1,
    status: 'initiated',
    // add other required properties here as per your Order model
    toJSON: () => ({ id: 1, status: 'initiated' }),
  } as Order;

  const ordersRepositoryMock = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepositoryAbstract,
          useValue: ordersRepositoryMock,
        },
        {
          provide: 'CACHE_MANAGER', // you can mock cacheManager if needed
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<OrdersRepositoryAbstract>(OrdersRepositoryAbstract);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the order if found', async () => {
    ordersRepositoryMock.findById.mockResolvedValue(mockOrder);

    const result = await service.findById(1);

    expect(result).toEqual(mockOrder);
    expect(ordersRepositoryMock.findById).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if order not found', async () => {
    ordersRepositoryMock.findById.mockResolvedValue(null);

    await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    expect(ordersRepositoryMock.findById).toHaveBeenCalledWith(999);
  });
});
