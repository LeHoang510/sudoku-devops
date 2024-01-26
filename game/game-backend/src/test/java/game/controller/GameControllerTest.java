package game.controller;

import game.model.Game;
import game.model.Map;
import game.service.GameService;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.mockito.Mockito.*;

@WebMvcTest(GameController.class)
class GameControllerTest {
    // Unit test print out : https://www.baeldung.com/java-testing-system-out-println
    @Autowired
    private MockMvc mockMvc;
    // Mock the GameService to isolate the controller and focus on testing it

    @Test
    void getMap() throws Exception {
        try (MockedStatic<GameService> mocked = mockStatic(GameService.class)) {
            String level = "easy";
            mocked.when(() -> GameService.getMap(level))
                    .thenReturn(new Map(0, level, "894230150201759438573481290125364879487592361936178542048920000009800020702600980"));
            mockMvc.perform(MockMvcRequestBuilders.get("/game/{level}", level)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().json("{\"id\":0," +
                            "\"level\":\"easy\"," +
                            "\"map\":\"894230150201759438573481290125364879487592361936178542048920000009800020702600980\"}"));
            // check print out

        }
    }

    @Test
    void generateMap() {
        try (MockedStatic<GameService> mocked = mockStatic(GameService.class)) {
            String level = "easy";
            mocked.when(() -> GameService.generateMap(level))
                    .thenReturn(new Map(0, level, "894230150201759438573481290125364879487592361936178542048920000009800020702600980"));
            mockMvc.perform(MockMvcRequestBuilders.get("/newGame/{level}", level)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().json("{\"id\":0," +
                            "\"level\":\"easy\"," +
                            "\"map\":\"894230150201759438573481290125364879487592361936178542048920000009800020702600980\"}"));
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Test
    void getLeaderboard() {
        try (MockedStatic<GameService> mocked = mockStatic(GameService.class)) {
            Game game1 = new Game(0, 100, "p1", "easy");
            Game game2 = new Game(1, 200, "p2", "easy");
            String level = "easy";
            int id = 0;
            mocked.when(() -> GameService.getLeaderboard(id, level))
                    .thenReturn(List.of(game1, game2));
            mockMvc.perform(MockMvcRequestBuilders.get("/leaderboard/{level}/{mapId}", level, id)
                            .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().json(
                            "[{\"mapId\":0,\"score\":100,\"player\":\"p1\",\"level\":\"easy\"}," +
                                    "{\"mapId\":1,\"score\":200,\"player\":\"p2\",\"level\":\"easy\"}]"
                    ));
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    @Test
    void saveGame() {
        try (MockedStatic<GameService> mocked = mockStatic(GameService.class)) {
            mocked.when(() -> GameService.saveGame(any(Game.class)))
                    .thenReturn(true);
            mockMvc.perform(MockMvcRequestBuilders.post("/game")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{\"mapId\":10,\"score\":100,\"player\":\"p1\",\"level\":\"easy\"}"))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andExpect(MockMvcResultMatchers.content().string("game saved"));
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}