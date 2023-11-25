package com.hactheclimatetest1.hacktheclimatetest1.controller;

import com.hactheclimatetest1.hacktheclimatetest1.model.BusStop;
import com.hactheclimatetest1.hacktheclimatetest1.service.BusStopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BusStopController {
    @Autowired
    private BusStopService busStopService;

    @GetMapping("/busstops")
    public List<BusStop> all() {return busStopService.all();}

    @PostMapping(path = "/busstop",
                 consumes = MediaType.APPLICATION_JSON_VALUE)
    public BusStop postBusStop(@RequestBody BusStop busStop)
    {
        busStopService.Save(busStop);
        return busStop;
    }
}
