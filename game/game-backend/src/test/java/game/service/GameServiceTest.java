package game.service;

import game.model.Game;
import game.model.Map;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import static org.powermock.api.mockito.PowerMockito.mockStatic;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(PowerMockRunner.class)
@PrepareForTest({GameService.class, HttpClient.class, HttpRequest.class, HttpResponse.class})
class GameServiceTest {

    @Test
    void generateMapAndSaveMap() throws IOException, InterruptedException {
        /**
        // Mock HttpClient
        HttpClient mockHttpClient = Mockito.mock(HttpClient.class);
        mockStatic(HttpClient.class); // HttpClient is final class, so it is unmockable
        when(HttpClient.newHttpClient()).thenReturn(mockHttpClient);

        // Mock HttpRequest
        HttpRequest mockHttpRequest = Mockito.mock(HttpRequest.class);
        mockStatic(HttpRequest.class);
        when(HttpRequest.newBuilder()
                .uri(any())
                .header(any(), any())
                .build()).thenReturn(mockHttpRequest);

        // Mock HttpResponse
        HttpResponse<String> mockHttpResponse = Mockito.mock(HttpResponse.class);
        when(mockHttpClient.send(any(), HttpResponse.BodyHandlers.ofString())).thenReturn(mockHttpResponse);
        when(mockHttpResponse.body()).thenReturn("894230150201759438573481290125364879487592361936178542048920000009800020702600980");
         */
        int n = (int) Files.lines(Paths.get("map/easy")).count();
        Map res = GameService.generateMap("easy");
        assertEquals(res.map.length(), 81);
        assertEquals(res.level, "easy");
        assertEquals(res.id, (int) Files.lines(Paths.get("map/easy")).count() - 1);
        assertEquals(1, (int) Files.lines(Paths.get("map/easy")).count() - n);
        // clean the test
        RandomAccessFile f = new RandomAccessFile("map/easy", "rw");
        byte b;
        long length = f.length() - 1;
        do {
            length -= 1;
            f.seek(length);
            b = f.readByte();
        } while(b != 10);
        f.setLength(length+1);
        f.close();
    }

    @Test
    void getMap() throws IOException {
        Map m = GameService.getMap("hard");
        assertEquals(m.map.length(), 81);
        assertEquals(m.level, "hard");
        assertTrue(m.id >= 0 && m.id < (int) Files.lines(Paths.get("map/hard")).count());
        String map = Files.readAllLines(Paths.get("map/"+m.level)).get(m.id).split("\\s+")[2];
        assertEquals(m.map, map);
    }

    @Test
    void saveGame() throws IOException {
        Game game1 = new Game(0, 30, "Anh", "easy");
        Game game2 = new Game(1, 30, "bsgreg", "easy");
        int n = (int) Files.lines(Paths.get("game/easy")).count();
        GameService.saveGame(game1);
        assertEquals(n, (int) Files.lines(Paths.get("game/easy")).count());
        GameService.saveGame(game2);
        assertEquals(n+1, (int) Files.lines(Paths.get("game/easy")).count());
        assertEquals(Files.readAllLines(Paths.get("game/easy")).get(n),"bsgreg 1 30");

        // clean the test
        RandomAccessFile f = new RandomAccessFile("game/easy", "rw");
        byte b;
        long length = f.length() - 1;
        do {
            length -= 1;
            f.seek(length);
            b = f.readByte();
        } while(b != 10);
        f.setLength(length+1);
        f.close();
    }

    @Test
    void getLeaderboard() throws IOException {
        List<Game> top = GameService.getLeaderboard(0, "easy");
        // sort the list of game
        top.sort((o1, o2) -> o2.score - o1.score);
        assertTrue(top.size() <= 5);
        // Assert that these are the lowest scores
        final List<String> lines = Files.readAllLines(Paths.get("game/easy"));
        // Get top 5 scores
        List<Integer> scores = lines.stream()
                .filter(line -> Integer.parseInt(line.split("\\s+")[1]) == 0)
                .map(line -> Integer.parseInt(line.split("\\s+")[2]))
                .sorted((a, b) -> b.compareTo(a))
                .limit(5)
                .collect(Collectors.toList());
        // Assert that the scores are the same
        for (int i = 0; i < top.size(); i++) {
            assertEquals(top.get(i).score, scores.get(i));
        }
    }

    @Test
    void getGameFromLine() {
    }

    @Test
    void countLine() throws IOException {
        assertEquals(GameService.countLine("map/easy"), (int) Files.lines(Paths.get("map/easy")).count());
    }
}