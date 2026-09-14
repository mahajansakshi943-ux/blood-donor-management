package com.blooddonor.blooddonor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.blooddonor.blooddonor.entity.Donor;
import java.util.List;
public interface DonorRepository extends JpaRepository<Donor, Long> {

    List<Donor> findByBloodGroup(String bloodGroup);

    List<Donor> findByCity(String city);
    
    List<Donor> findByBloodGroupAndCity(String bloodGroup, String city);
    
}