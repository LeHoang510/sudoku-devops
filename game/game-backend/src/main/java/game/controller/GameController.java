package game.controller;

import game.model.Game;
import game.model.Map;
import game.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
public class GameController {

    @Autowired
    GameService gameService;

    @ResponseBody
    @GetMapping(path = "/game/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map getMap(@PathVariable("level") String level){
        System.out.println("get map endpoint works");
        return this.gameService.getMap(level);
    }

    @ResponseBody
    @GetMapping(path = "/newGame/{level}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map generateMap(@PathVariable("level") String level) throws IOException, InterruptedException {
        System.out.println("generate map endpoint works");
        return this.gameService.generateMap(level);
    }

    @ResponseBody
    @GetMapping(path = "/leaderboard/{level}/{mapId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Game[] getLeaderboard(@PathVariable("mapId") int id, @PathVariable("level") String level){
        System.out.println("get leaderboard endpoint works");
        return this.gameService.getLeaderboard(id, level);
    }

    @PostMapping(path = "/game", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.TEXT_PLAIN_VALUE)
    public String saveGame(@RequestBody Game game) throws IOException {
        System.out.println("save game endpoint works");
        System.out.println(game.toString());
        if (this.gameService.saveGame(game)) {
            return "game saved";
        } else {
            return "server failed dumb bitch";
        }
    }
}
