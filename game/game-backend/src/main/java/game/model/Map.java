package game.model;

public class Map {
    private int id;
    private String map;
    private String level;

    public Map(int id, String map, String level){
        this.id = id;
        this.map = map;
        this.level = level;
    }

    @Override
    public String toString() {
        return "Map{" +
                "id=" + id +
                ", map='" + map + '\'' +
                ", level='" + level + '\'' +
                '}';
    }
}
