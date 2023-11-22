package com.cntt2.user.service;

import com.cntt2.user.dto.EmailRequest;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {
    void sendEmail(EmailRequest emailRequest) throws UnsupportedEncodingException, MessagingException;

}
