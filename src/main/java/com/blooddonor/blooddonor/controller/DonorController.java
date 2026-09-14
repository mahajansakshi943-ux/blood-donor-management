package com.blooddonor.blooddonor.controller;

import com.blooddonor.blooddonor.entity.Donor;
import com.blooddonor.blooddonor.service.DonorService;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {

    private final DonorService donorService;

    public DonorController(DonorService donorService) {
        this.donorService = donorService;
    }

    @PostMapping
    public Donor addDonor(@Valid @RequestBody Donor donor) {
        return donorService.addDonor(donor);
    }

    @GetMapping
    public List<Donor> getAllDonors() {
        return donorService.getAllDonors();
    }
     @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable Long id) {
        return donorService.getDonorById(id);
    }
    @DeleteMapping("/{id}")
    public void deleteDonor(@PathVariable Long id) {
        donorService.deleteDonor(id);
    }
    @PutMapping("/{id}")
    public Donor updateDonor(@PathVariable Long id,@Valid @RequestBody Donor donor) {
        return donorService.updateDonor(id, donor);
    }
    @GetMapping("/bloodgroup/{bloodGroup}")
    public List<Donor> getDonorsByBloodGroup(@PathVariable String bloodGroup) {
        return donorService.getDonorsByBloodGroup(bloodGroup);
    }

    @GetMapping("/city/{city}")
    public List<Donor> getDonorsByCity(@PathVariable String city) {
        return donorService.getDonorsByCity(city);
    }
    @GetMapping("/search")
    public List<Donor> searchDonors(
        @RequestParam String bloodGroup,
        @RequestParam String city) {

    return donorService.searchDonors(bloodGroup, city);
}

@PutMapping("/{id}/availability")
public Donor updateAvailability(
        @PathVariable Long id,
        @RequestParam boolean available) {

    Donor donor = donorService.getDonorById(id);

    if (donor == null) {
        return null;
    }

    donor.setAvailable(available);
    return donorService.updateDonor(id, donor);
}

@GetMapping("/count")
public long getDonorCount() {
    return donorService.getAllDonors().size();
}
@GetMapping("/count/{bloodGroup}")
public long getDonorCountByBloodGroup(@PathVariable String bloodGroup) {
    return donorService.getDonorsByBloodGroup(bloodGroup).size();
}
  }