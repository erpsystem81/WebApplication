package com.vbill.Services.Authentication;

import java.util.List;

import com.vbill.DTOS.Authentication.SignupRequestDTO;
import com.vbill.DTOS.Authentication.SignupResponseDTO;

public interface SignupService {
	SignupResponseDTO signup(SignupRequestDTO request);
	
	public List<SignupResponseDTO> getAllUsers();
}
