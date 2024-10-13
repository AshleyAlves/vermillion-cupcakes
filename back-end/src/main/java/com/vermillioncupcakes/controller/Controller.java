package com.vermillioncupcakes.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("/administrativo")
    public String MainAccess(){
        return "administrativo/inicio";
    }
    
}