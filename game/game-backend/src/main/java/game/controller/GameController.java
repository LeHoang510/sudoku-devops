package game.controller;

import game.model.Game;
import game.model.Map;
import game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.io.IOException;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class GameController {

    @Autowired
    private GameService gameService;

    @ResponseBody
    @GetMapping(path = "/game/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map getMap(@PathVariable("level") final String level) {
        System.out.println("get map endpoint works");
        return GameService.getMap(level);
    }

    @ResponseBody
    @GetMapping(path = "/newGame/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map generateMap(@PathVariable("level") final String level) throws IOException, InterruptedException {
        System.out.println("generate map endpoint works");
        return GameService.generateMap(level);
    }

    @ResponseBody
    @GetMapping(path = "/leaderboard/{level}/{mapId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Game> getLeaderboard(@PathVariable("mapId") final int id, @PathVariable("level") final String level) throws IOException {
        System.out.println("get leaderboard endpoint works");
        return this.gameService.getLeaderboard(id, level);
    }

    @PostMapping(path = "/game", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public String saveGame(@RequestBody final Game game) throws IOException {
        System.out.println("save game endpoint works");
        System.out.println(game.toString());
        if (this.gameService.saveGame(game)) {
            return "game saved";
        } else {
            return "game haven't been saved yet";
        }
    }
}
