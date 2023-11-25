package com.hactheclimatetest1.hacktheclimatetest1.service;

import com.hactheclimatetest1.hacktheclimatetest1.model.BusStop;
import com.hactheclimatetest1.hacktheclimatetest1.model.Route;
import com.hactheclimatetest1.hacktheclimatetest1.repository.BusStopRepository;
import com.hactheclimatetest1.hacktheclimatetest1.repository.RouteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusStopServiceImpl implements BusStopService {

    @Autowired
    BusStopRepository busStopRepository;
    @Autowired
    RouteRepository routeRepository;
    @Override
    @Transactional
    public BusStop Save(BusStop busStop)
    {
        busStop = busStopRepository.save(busStop);
        Route route = new Route("666");
        routeRepository.save(route);
        busStop.setRoute(route);
        return busStopRepository.save(busStop);
    }

    @Override
    public List<BusStop> all() {
        return busStopRepository.findAll();
    }
}
