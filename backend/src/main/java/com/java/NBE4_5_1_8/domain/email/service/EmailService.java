package com.java.NBE4_5_1_8.domain.email.service;

import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderConfirmation(String toEmail, Long orderId, List<OrderItem> orderItems) {
        String subject = "주문 완료 안내 (주문번호: " + orderId + ")";
        String body = buildOrderEmailBody(orderId, orderItems);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }
    }

    private String buildOrderEmailBody(Long orderId, List<OrderItem> orderItems) {
        StringBuilder sb = new StringBuilder();
        sb.append("<h2>주문이 완료되었습니다!</h2>")
                .append("<p>주문번호: ").append(orderId).append("</p>")
                .append("<h3>주문 내역:</h3><ul>");

        for (OrderItem item : orderItems) {
            sb.append("<li>")
                    .append("상품명: ").append(item.getItem().getItemName()).append("<br>")
                    .append("수량: ").append(item.getQuantity()).append("<br>")
                    .append("가격: ").append(item.getOrderPrice()).append("원")
                    .append("</li>");
        }

        sb.append("</ul>");
        return sb.toString();
    }
}
