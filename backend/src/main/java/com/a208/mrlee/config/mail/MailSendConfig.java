package com.a208.mrlee.config.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import sendinblue.ApiClient;
import sendinblue.Configuration;
import sendinblue.auth.ApiKeyAuth;
import sibApi.TransactionalEmailsApi;
import sibModel.SendSmtpEmail;
import sibModel.SendSmtpEmailSender;
import sibModel.SendSmtpEmailTo;

import java.security.SecureRandom;
import java.util.Collections;
import java.util.Random;

@org.springframework.context.annotation.Configuration
public class MailSendConfig {
    private final String apiKey;
    private final String fromEmail;
    private final TransactionalEmailsApi transactionalEmailsApi;

    private static final Random random = new SecureRandom();
    private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public MailSendConfig(@Value("${sendinblue.apikey}") String apiKey,
                      @Value("${sendinblue.email}") String fromEmail) {
        this.apiKey = apiKey;
        this.fromEmail = fromEmail;

        ApiClient defaultClient = Configuration.getDefaultApiClient();
        ApiKeyAuth apiKeyAuth = (ApiKeyAuth) defaultClient.getAuthentication("api-key");
        apiKeyAuth.setApiKey(apiKey);

        transactionalEmailsApi = new TransactionalEmailsApi(defaultClient);
    }

    public String sendEmail(String recipient) {
        String code = this.randomString();
        SendSmtpEmail sendEmail = new SendSmtpEmail()
                .sender(new SendSmtpEmailSender().email(fromEmail))
                .to(Collections.singletonList(new SendSmtpEmailTo().email(recipient)))
                .subject("[LiCa] 회원가입 인증메일입니다.")
                .textContent(new StringBuffer()
                        .append("[LiCa] 이메일 인증 \n")
                        .append("안녕하세요. LiCa입니다 \n")
                        .append("이메일을 인증하려면 "+ code +" 를 입력하세요. \n")
                        .toString());
        try {
            transactionalEmailsApi.sendTransacEmail(sendEmail);
            System.out.println("Email sent to " + recipient);
        } catch (Exception e) {
            System.err.println("Exception when calling TransactionalEmailsApi#sendTransacEmail");
            e.printStackTrace();
        }
        return code;
    }

    public static String randomString() {
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 6; i++) {
            int randomIndex = random.nextInt(ALPHABET.length());
            char randomChar = ALPHABET.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }
}