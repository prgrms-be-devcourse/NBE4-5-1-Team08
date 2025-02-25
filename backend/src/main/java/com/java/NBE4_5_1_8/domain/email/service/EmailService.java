package com.java.NBE4_5_1_8.domain.email.service;

import com.java.NBE4_5_1_8.domain.orderitem.entity.OrderItem;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderConfirmation(String toEmail, Long orderId, List<OrderItem> orderItems) {
        try {
            String emailTemplate = loadEmailTemplate();

            String orderItemsHtml = orderItems.stream()
                    .map(item -> String.format(
                            "<tr style=\"text-align: center;\">" +
                                    "<td style=\"padding: 10px; border: 1px solid #ddd;\">%s</td>" +
                                    "<td style=\"padding: 10px; border: 1px solid #ddd;\">%d</td>" +
                                    "<td style=\"padding: 10px; border: 1px solid #ddd;\">%d원</td></tr>",
                            item.getItem().getItemName(),
                            item.getQuantity(),
                            item.getOrderPrice()))
                    .collect(Collectors.joining());

            String emailBody = emailTemplate
                    .replace("{{orderId}}", String.valueOf(orderId))
                    .replace("{{orderItems}}", orderItemsHtml);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject("주문 완료 안내 (주문번호: " + orderId + ")");
            helper.setText(emailBody, true);

            mailSender.send(message);
        } catch (MessagingException | IOException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }
    }

    private String loadEmailTemplate() throws IOException {
        ClassPathResource resource = new ClassPathResource("templates/email-template.html");
        return new String(Files.readAllBytes(resource.getFile().toPath()), "UTF-8");
    }
}
