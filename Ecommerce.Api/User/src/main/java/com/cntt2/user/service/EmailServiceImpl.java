package com.cntt2.user.service;

import com.cntt2.user.dto.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class EmailServiceImpl implements EmailService{
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendEmail(EmailRequest emailRequest) throws UnsupportedEncodingException, MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
//mimeMessage.setContent(htmlMsg, "text/html"); /** Use this or below line **/
        helper.setText(emailRequest.getMsgBody(), true); // Use this or above line.
        helper.setTo(emailRequest.getRecipient());
        helper.setSubject(emailRequest.getSubject());
        helper.setFrom(new InternetAddress(fromEmail, "E Commerce Email Notification"));
        javaMailSender.send(mimeMessage);
    }
}
