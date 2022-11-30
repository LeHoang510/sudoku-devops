package game.service;

import game.model.Game;
import game.model.Map;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Random;

@Service
public class GameService { // why this shit live in game-backend folder

    public static Map generateMap(String level) throws IOException, InterruptedException {
        // sample of request "https://sudoku.diverse-team.fr/sudoku-provider/easy",{'responseType': 'text'}

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://sudoku.diverse-team.fr/sudoku-provider/"+level))
                .header("responseType", "text")
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        /*
        System.out.println(response.body());
        System.out.println(response.body().getClass().getName()); // String
        */

        Map res = new Map(countLine("map/"+level),response.body(),level);
        saveMap(res);
        System.out.println(res);
        return res;
    }

    public static Map getMap(String level){
        Random r = new Random();
        int n = r.nextInt( countLine("map/"+level));
        try{
            String line = Files.readAllLines(Paths.get("map/"+level)).get(n);
            System.out.println(n);
            System.out.println(line);
            String[] words = line.split("\\s+");
            return new Map(Integer.parseInt(words[0]),words[1],words[2]);
        }
        catch(IOException e){
            System.out.println(e);
        }
        return null;
    }

    public static void saveMap(Map m){
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter("map/"+m.level,true));
            writer.append(m.id + " " + m.level + " " + m.map + "\n");
            writer.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
    }

    // TODO:
    // constraint of safe game : Only one score (the best one) for one player on a given grid.
    public boolean saveGame(Game g){
        // check if the player have play the game before
        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter("game/"+g.level,true));
            writer.append(g.player + " " + g.mapId + " " + g.score + "\n");
            writer.close();
            System.out.println("Successfully wrote to the file.");
        } catch (IOException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
            return false;
        }
        return true;
    }

    //TODO:
    public Game[] getLeaderboard(int id){
        return null;
    }

    public static int countLine(String fileName) { // count nb of line in the storing text file

        int lines = 0;

        /*
        File f = new File(fileName);
        System.out.println(f.getAbsolutePath());
        */

        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            while (reader.readLine() != null) lines++;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return lines;
    }

    public static void main(String[] args) throws IOException, InterruptedException {

        // generate map
        /*
        for (String s : new String[]{"easy", "medium", "hard", "very-hard", "insane", "inhuman"}){
            for (int i = 0; i < 5; i++){
                generateMap(s);
            }
        }
        */

        System.out.println(getMap("easy"));

    }

}
