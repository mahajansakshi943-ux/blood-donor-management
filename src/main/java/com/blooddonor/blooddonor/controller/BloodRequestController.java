package com.blooddonor.blooddonor.controller;

import com.blooddonor.blooddonor.entity.BloodRequest;
import com.blooddonor.blooddonor.service.BloodRequestService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
public class BloodRequestController {

    private final BloodRequestService bloodRequestService;

    public BloodRequestController(BloodRequestService bloodRequestService) {
        this.bloodRequestService = bloodRequestService;
    }

    @PostMapping
    public BloodRequest createRequest(@Valid @RequestBody BloodRequest request) {
        return bloodRequestService.createRequest(request);
    }

    @GetMapping
    public List<BloodRequest> getAllRequests() {
        return bloodRequestService.getAllRequests();
    }

    @GetMapping("/{id}")
    public BloodRequest getRequestById(@PathVariable Long id) {
        return bloodRequestService.getRequestById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        bloodRequestService.deleteRequest(id);
    }

    @GetMapping("/bloodgroup/{bloodGroup}")
    public List<BloodRequest> getRequestsByBloodGroup(
            @PathVariable String bloodGroup) {
        return bloodRequestService.getRequestsByBloodGroup(bloodGroup);
    }

    @GetMapping("/city/{city}")
    public List<BloodRequest> getRequestsByCity(
            @PathVariable String city) {
        return bloodRequestService.getRequestsByCity(city);
    }

    @GetMapping("/search")
    public List<BloodRequest> searchRequests(
            @RequestParam String bloodGroup,
            @RequestParam String city) {
        return bloodRequestService.searchRequests(bloodGroup, city);
    }
}