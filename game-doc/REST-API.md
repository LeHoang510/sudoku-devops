# Generate new map 

**URI :** /new?level={level}

**VERB :** GET

**Description :** API to generate new map

**Input :** Aucun

**Output :** 

    {
        "map_id" : 12345
        "level" : "Moyen"
        "map" : [
            5,3,0,0,7,0,0,0,0,
            6,0,0,1,9,5,0,0,0,
            0,9,8,0,0,0,0,6,0,
            8,0,0,0,6,0,0,0,3,
            4,0,0,8,0,3,0,0,1,
            7,0,0,0,2,0,0,0,6,
            0,6,0,0,0,0,2,8,0,
            0,0,0,4,1,9,0,0,5,
            0,0,0,0,8,0,0,7,9
        ]
    }

# Get map 

**URI :** /map?level={level}

**VERB :** GET

**Description :** API to get an existing map

**Input :** Auncun

**Output :**

    {
        "map_id" : 1324
        "level" : "Difficile"
        "map" : [
            3,0,1,0,2,6,5,0,0,
            8,0,0,5,0,0,0,7,0,
            0,0,9,0,7,0,2,0,8,
            9,6,0,4,0,2,1,3,0,
            0,0,0,9,0,8,0,0,4,
            0,2,3,0,0,0,0,8,0,
            2,0,0,0,8,5,0,0,0,
            0,0,7,1,0,0,4,6,0,
            1,0,6,0,0,7,8,0,3
        ]
    }

# Save game 

**URI :** /game

**VERB :** GET

**Description :** API to save an completed game

**Input :** 

    {
        "id_map" : 232324,
        "player" : "Tung",
        "score" : 33,
        "History" :[
            {
                "index" : 5 ,
                "value" : 6
            },
            {
                "index" : 68,
                "value" : 6
            },
            ...
        ]
    }

**Output :** Aucun

# Get leader map 

**URI :** /leader_map?map_id={id}

**VERB :** GET

**Description :** API to save an completed game

**Input :** Aucun

**Output :** 

{
    "map_id" : 32154
    "line" : [
        {
            "player" : "Tung",
            "score" : 50
        },
        {
            "player" : "Tu",
            "score" : 41
        }
    ]
}