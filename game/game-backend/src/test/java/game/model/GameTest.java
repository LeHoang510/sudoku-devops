package game.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GameTest {
    Game game;
    @BeforeEach
    void setUp(){
        game = new Game(1, 100, "Dupont", "easy");
    }
    @Test
    void testToString() {
        assertEquals("Game{mapId=1, level='easy', score=100, player='Dupont'}", game.toString());
    }
}