package game.service;

import game.model.Game;
import game.model.Map;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

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

    public Map getMap(String level){
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

    public boolean saveGame(Game g){
        return true;
    }

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
        generateMap("easy");
    }

}
