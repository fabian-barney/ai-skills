package media.barney.ai.skill;

import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class SkillCatalogApplication {

    public static void main(String[] args) {
        new SpringApplicationBuilder(SkillCatalogApplication.class)
            .web(WebApplicationType.NONE)
            .run(args);
    }
}
