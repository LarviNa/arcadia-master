package com.arcadia.comics.consumer;

import com.arcadia.comics.dto.OrderEventDTO;
import com.arcadia.comics.service.ComicService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class InventoryConsumer {

    private final ComicService comicService;

    public InventoryConsumer(ComicService comicService) {
        this.comicService = comicService;
    }

    @RabbitListener(queues = "inventory.order.paid.queue")
    public void handleOrderPaid(OrderEventDTO event) {
        System.out.println("=================================================");
        System.out.println("RabbitMQ: Received Order Paid event for inventory update.");
        System.out.println("Order ID: " + event.getOrderId());
        
        if (event.getItems() != null) {
            event.getItems().forEach(item -> {
                comicService.reduceStock(item.getComicId(), item.getQuantity());
            });
        }
        System.out.println("=================================================");
    }
}
