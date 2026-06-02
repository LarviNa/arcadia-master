package com.arcadia.usuarios.consumer;

import com.arcadia.usuarios.dto.OrderEventDTO;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class EmailConsumer {

    @RabbitListener(queues = "email.notification.queue")
    public void handleEmailNotification(OrderEventDTO event) {
        System.out.println("=================================================");
        System.out.println("SIMULATION: Sending order confirmation email...");
        System.out.println("To User ID: " + event.getUserId());
        System.out.println("Order ID: " + event.getOrderId());
        System.out.println("Items purchased: " + (event.getItems() != null ? event.getItems().size() : 0));
        System.out.println("=================================================");
    }
}
