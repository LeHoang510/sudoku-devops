package game.model;

public class Map {
    public int id;
    public String map;
    public String level;

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
