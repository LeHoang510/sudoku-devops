package game.model;

public class Game {
    private int mapId;
    private int score;
    private String player;

    public Game(int id, int s, String player){
        this.mapId = id;
        this.score = s;
        this.player = player;
    }

    @Override
    public String toString() {
        return "Game{" +
                "mapId=" + mapId +
                ", score=" + score +
                ", player='" + player + '\'' +
                '}';
    }
}
