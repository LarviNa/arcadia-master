package com.arcadiacomics.ventas.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE_NAME = "arcadia.orders.exchange";
    public static final String QUEUE_NAME = "inventory.order.paid.queue";
    public static final String ROUTING_KEY = "order.event.paid";
    
    public static final String EMAIL_QUEUE_NAME = "email.notification.queue";
    public static final String EMAIL_ROUTING_KEY = "order.event.email";


    @Bean
    public TopicExchange ordersExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue orderPaidQueue() {
        return new Queue(QUEUE_NAME, true);
    }

    @Bean
    public Binding bindingOrderPaid(Queue orderPaidQueue, TopicExchange ordersExchange) {
        return BindingBuilder.bind(orderPaidQueue).to(ordersExchange).with(ROUTING_KEY);
    }

    @Bean
    public Queue emailNotificationQueue() {
        return new Queue(EMAIL_QUEUE_NAME, true);
    }

    @Bean
    public Binding bindingEmailNotification(Queue emailNotificationQueue, TopicExchange ordersExchange) {
        return BindingBuilder.bind(emailNotificationQueue).to(ordersExchange).with(EMAIL_ROUTING_KEY);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
