package com.blooddonor.blooddonor.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;
    @NotBlank(message = "Blood group is required")
   @Pattern(
    regexp = "^(A[+-]|B[+-]|AB[+-]|O[+-])$",
    message = "Invalid blood group"
)
    private String bloodGroup;
    @Min(value = 18, message = "Age must be at least 18")
    private int age;
    private String gender;
    @Pattern(
    regexp = "^[6-9][0-9]{9}$",
    message = "Phone number must be 10 digits"
)
    private String phone;
    @NotBlank(message = "City is required")
    private String city;
    private boolean available = true;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getBloodGroup() {
        return bloodGroup;
    }
    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public boolean isAvailable() {
    return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }
    }