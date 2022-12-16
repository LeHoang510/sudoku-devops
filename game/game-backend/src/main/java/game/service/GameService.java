package game.service;

import game.model.Game;
import game.model.Map;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class GameService { // why this shit live in game-backend folder

    public static Map generateMap(final String level) throws IOException, InterruptedException {
        // sample of request "https://sudoku.diverse-team.fr/sudoku-provider/easy",{'responseType': 'text'}

        final HttpClient client = HttpClient.newHttpClient();
        final HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://sudoku.diverse-team.fr/sudoku-provider/" + level))
                .header("responseType", "text")
                .build();

        final HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        /*
        System.out.println(response.body());
        System.out.println(response.body().getClass().getName()); // String
        */

        final Map res = new Map(countLine("map/" + level), response.body(), level);
        saveMap(res);
        System.out.println(res);
        return res;
    }

    public static Map getMap(final String level) {
        final Random r = new Random();
        final int n = r.nextInt(countLine("map/" + level));
        try {
            final String line = Files.readAllLines(Paths.get("map/" + level)).get(n);
            System.out.println(n);
            System.out.println(line);
            final String[] words = line.split("\\s+");
            return new Map(Integer.parseInt(words[0]), words[1], words[2]);
        } catch (IOException e) {
            System.out.println(e);
        }
        return null;
    }

    public static void saveMap(final Map m) throws IOException {
        BufferedWriter writer = null;
        try {
            writer = new BufferedWriter(new FileWriter("map/" + m.level, true));
            writer.append(m.id + " " + m.level + " " + m.map + "\n");

        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        } finally {
            if (writer != null) {
                writer.close();
            }
            System.out.println("Successfully wrote to the file.");
        }
    }
    // constraint of safe game : Only one score (the best one) for one player on a given grid.
    public boolean saveGame(final Game g) throws IOException {
        // check if the player have play the game before
        boolean existed = false;
        final List<String> lines = Files.readAllLines(Paths.get("game/" + g.level));
        System.out.println(lines.size());
        final int tmp = countLine("game/" + g.level);
        for (int n = 0; n < tmp; n++) {
            final String line = lines.get(n);
            final String[] words = line.split("\\s+");
            if (g.player.equals(words[0]) && g.mapId == Integer.parseInt(words[1])) {
                System.out.println("the player have play the game before");
                existed = true;
                if (Integer.parseInt(words[2]) > g.score) {
                    // rewrite the n line
                    lines.set(n, g.player + " " + g.mapId + " " + g.score);
                    Files.write(Paths.get("game/" + g.level), lines, StandardCharsets.UTF_8);
                }
                break;
            }
        }

        if (!existed) {
            final BufferedWriter writer = new BufferedWriter(new FileWriter("game/" + g.level, true));
            try {
                writer.append(g.player + " " + g.mapId + " " + g.score + "\n");
            } catch (IOException e) {
                System.out.println("An error occurred.");
                e.printStackTrace();
                return false;
            } finally {
                writer.close();
                System.out.println("Successfully wrote to the file.");
            }
        }
        return true;
    }
    public List<Game> getLeaderboard(final int id, final String level) throws IOException {
        final List<Game> top5 = new ArrayList<>();
        final List<String> lines = Files.readAllLines(Paths.get("game/" + level));
        final Set<Integer> res = new HashSet<Integer>();
        int min = 99999;
        int minIndex = -1;
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < lines.size(); j++) {
                final String[] tmp = lines.get(j).split("\\s+");
                if (!res.contains(j) && Integer.parseInt(tmp[1]) == id) {
                    if (Integer.parseInt(tmp[2]) < min) {
                        minIndex = j;
                        min = Integer.parseInt(tmp[2]);
                    }
                }
            }
            if (minIndex != -1) {
                res.add(minIndex);
                final String[] tmp = lines.get(minIndex).split("\\s+");
                top5.add(new Game(id, min, tmp[0], level));
            } else {
                break;
            }
            minIndex = -1;
            min = 99999;
        }
        return top5;
    }

    public static Game getGameFromLine(final int n, final String level) {
        try {
            final String line = Files.readAllLines(Paths.get("game/" + level)).get(n);
            final String[] words = line.split("\\s+");
            return new Game(Integer.parseInt(words[1]), Integer.parseInt(words[2]), words[0], level);
        } catch (IOException e) {
            System.out.println(e);
            return null;
        }
    }

    public static int countLine(final String fileName) { // count nb of line in the storing text file

        int lines = 0;

        /*
        File f = new File(fileName);
        System.out.println(f.getAbsolutePath());
        */

        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            while (reader.readLine() != null) {
                lines++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return lines;
    }

    public static void main(final String[] args) throws IOException, InterruptedException {

        // generate map
        /*
        for (String s : new String[]{"easy", "medium", "hard", "very-hard", "insane", "inhuman"}){
            for (int i = 0; i < 5; i++){
                generateMap(s);
            }
        }
        */
        System.out.println(countLine("map/easy"));
        System.out.println(getMap("easy"));
        System.out.println(getGameFromLine(4, "easy"));
    }

}
