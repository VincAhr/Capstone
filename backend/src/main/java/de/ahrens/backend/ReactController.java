package de.ahrens.backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReactController {

    @RequestMapping(value = "/**/{[path:[^\\.]*}")
    public String forwardToRuoteUrl() {
        return "forward:/";
    }
}
