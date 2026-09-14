package com.blooddonor.blooddonor.repository;

import com.blooddonor.blooddonor.entity.BloodRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BloodRequestRepository extends JpaRepository<BloodRequest, Long> {

    List<BloodRequest> findByBloodGroup(String bloodGroup);

    List<BloodRequest> findByCity(String city);

    List<BloodRequest> findByBloodGroupAndCity(String bloodGroup, String city);
}