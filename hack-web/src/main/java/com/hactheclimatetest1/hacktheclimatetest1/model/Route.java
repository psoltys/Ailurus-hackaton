package com.hactheclimatetest1.hacktheclimatetest1.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Route {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public List<BusStop> getBusStops() {
        return busStops;
    }

    public void setBusStops(List<BusStop> busStops) {
        this.busStops = busStops;
    }
    @JsonManagedReference
    @OneToMany(mappedBy = "route", cascade = CascadeType.ALL)
    private List<BusStop> busStops = new ArrayList<>();

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

    private String name;
    public Route() {};

    public Route(String name)
    {
        this.name=name;
    }
}
