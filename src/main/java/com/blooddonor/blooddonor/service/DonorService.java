package com.blooddonor.blooddonor.service;

import org.springframework.stereotype.Service;
import com.blooddonor.blooddonor.repository.DonorRepository;
import com.blooddonor.blooddonor.entity.Donor;

import java.util.List;

@Service
public class DonorService {

    private final DonorRepository donorRepository;

    public DonorService(DonorRepository donorRepository) {
        this.donorRepository = donorRepository;
    }

    public Donor addDonor(Donor donor) {
        return donorRepository.save(donor);
    }

    public List<Donor> getAllDonors() {
        return donorRepository.findAll();
    }
    public Donor getDonorById(Long id) {
    return donorRepository.findById(id).orElse(null);
    }
    public void deleteDonor(Long id) {
        donorRepository.deleteById(id);
    }
    public Donor updateDonor(Long id, Donor donor) {
    donor.setId(id);
    return donorRepository.save(donor);
}
public List<Donor> getDonorsByBloodGroup(String bloodGroup) {
    return donorRepository.findByBloodGroup(bloodGroup);
}

public List<Donor> getDonorsByCity(String city) {
    return donorRepository.findByCity(city);
}
public List<Donor> searchDonors(String bloodGroup, String city) {
    return donorRepository.findByBloodGroupAndCity(bloodGroup, city);
}

}