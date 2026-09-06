package com.vbill.Services.Authentication;

import com.vbill.DTOS.Authentication.LoginRequestDTO;
import com.vbill.DTOS.Authentication.LoginResponseDTO;

public interface LoginService {

    LoginResponseDTO login(LoginRequestDTO request);
}