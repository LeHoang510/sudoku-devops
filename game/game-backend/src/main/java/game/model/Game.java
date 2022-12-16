package game.model;

public class Game {
    public int mapId;
    public String level; // for easier saving and finding
    public int score;
    public String player;

    public Game(final int id, final int s, final String player, final String l) {
        this.mapId = id;
        this.score = s;
        this.player = player;
        this.level = l;
    }

    @Override
    public String toString() {
        return "Game{"
                + "mapId=" + mapId
                + ", level='" + level + '\''
                + ", score=" + score
                + ", player='" + player + '\''
                + '}';
    }
}
