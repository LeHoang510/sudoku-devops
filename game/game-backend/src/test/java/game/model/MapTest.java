package game.model;

import org.junit.jupiter.api.BeforeEach;

import static org.junit.jupiter.api.Assertions.*;

class MapTest {
    Map map;
    @BeforeEach
    void setUp(){
        map = new Map(1, "easy", "016000208847360000302180000123008050060003941005671800504710392279000160631000080");
    }
    @org.junit.jupiter.api.Test
    void testToString() {
        assertEquals("Map{id=1, map='016000208847360000302180000123008050060003941005671800504710392279000160631000080', level='easy'}", map.toString());
    }

}