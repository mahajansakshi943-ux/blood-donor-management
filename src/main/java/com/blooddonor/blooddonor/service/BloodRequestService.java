package com.blooddonor.blooddonor.service;

import com.blooddonor.blooddonor.entity.BloodRequest;
import com.blooddonor.blooddonor.repository.BloodRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BloodRequestService {

    private final BloodRequestRepository bloodRequestRepository;

    public BloodRequestService(BloodRequestRepository bloodRequestRepository) {
        this.bloodRequestRepository = bloodRequestRepository;
    }

    public BloodRequest createRequest(BloodRequest request) {
        return bloodRequestRepository.save(request);
    }

    public List<BloodRequest> getAllRequests() {
        return bloodRequestRepository.findAll();
    }

    public BloodRequest getRequestById(Long id) {
        return bloodRequestRepository.findById(id).orElse(null);
    }

    public void deleteRequest(Long id) {
        bloodRequestRepository.deleteById(id);
    }

    public List<BloodRequest> getRequestsByBloodGroup(String bloodGroup) {
        return bloodRequestRepository.findByBloodGroup(bloodGroup);
    }

    public List<BloodRequest> getRequestsByCity(String city) {
        return bloodRequestRepository.findByCity(city);
    }

    public List<BloodRequest> searchRequests(String bloodGroup, String city) {
        return bloodRequestRepository.findByBloodGroupAndCity(bloodGroup, city);
    }
}