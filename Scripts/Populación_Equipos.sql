-- POBLACIÓN DE EQUIPOS TIPO SELECCION
INSERT INTO TEAM VALUES ('Selección', 'Alemania'), ('Selección', 'Costa Rica'),('Selección', 'Honduras'),('Selección', 'España'),('Selección', 'Inglaterra'),('Selección', 'Chile'),('Selección', 'Japón'),('Selección', 'Rusia');

-- POBLACIÓN DE EQUIPOS LOCALES
 INSERT INTO TEAM VALUES ('Local', 'Club Sport Cartaginés'),('Local', 'Deportivo Saprissa'),('Local', 'Club Sport Herediano'),('Local', 'Liga Deportiva Alajuelense');
 
 -- Población jugadores Alemania
-- CREACIÓN DE JUGADOR
INSERT INTO PLAYER VALUES ('Oliver Baumann','1990-05-12',32,'Portero'),('Antonio Rüdiger','1993-12-27',29,'Defensa central'),('Niklas Süle','1995-04-28',27,'Denfensa Central'),('Kevin Trapp','1990-01-12',32,'Portero'),('Thilo Kherer','1996-10-05',26,'Defensa Central'),('Matthias Ginter','1994-02-14',28,'Defensa Central'),('Ilkay Gündogan','1990-11-19',32,'Mediocentro'),('Steve Hendrich','1997-05-12',25,'pivote'),('Albert Smith','1992-07-12',29,'Mediocentro'),('Michael Red','1999-09-25',23,'Interior izquierdo'),
						('Bernal Bonham','1991-08-10',31,'Pivote'),('Matt Beckham','1994-05-12',28,'Mediocentro ofensivo'),('Nikola Armstrong','1999-12-12',22,'Delantero centro'),('Roger Nicker','1997-08-04',25,'Defensa'),('Vladimir KarKarov','1990-06-17',32,'Mediocentro'),('Andrea Obrian','1992-10-12',30,'Pivote'),('Martin King','1995-05-12',27,'Portero'),('Jules Potter','1991-12-27',30,'Mediocentro'),('Brian Zurich','1995-04-13',27,'Extremo derecho'),('Oliver Bones','1998-05-13',22,'Mediapunta');

-- Asignación al equipo Aleman
INSERT INTO PLAYER_TEAM VALUES (1,1),(1,2),(1,3),(1,4),(1,5),(1,6),(1,7),(1,8),(1,9),(1,10),(1,11),(1,12),(1,13),(1,14),(1,15),(1,16),(1,17),(1,18),(1,19),(1,20);

--Población Jugadores Costa Rica
-- CREACIÓN DE JUGADOR
INSERT INTO PLAYER VALUES ('Marco Ramirez','1990-05-12',32,'Portero'),('Antonio Morales','1993-12-27',29,'Defensa central'),('Braulio Mata','1995-04-28',27,'Denfensa Central'),('Josué Lizano','1990-01-12',32,'Portero'),('Mario Redondo','1996-10-05',26,'Defensa Central'),('Julio Berne','1994-02-14',28,'Defensa Central'),('Tomás Acosta','1990-11-19',32,'Mediocentro'),('Steve Carvajal','1997-05-12',25,'pivote'),('Jaime Mora','1992-07-12',29,'Mediocentro'),('Luis Gonzalez','1999-09-25',23,'Interior izquierdo'),
						('Roman Díaz','1991-08-10',31,'Pivote'),('Paco Montero','1994-05-12',28,'Mediocentro ofensivo'),('Dennis Alvares','1999-12-12',22,'Delantero centro'),('Mateo Rojas','1997-08-04',25,'Defensa'),('Ignacio Santos','1990-06-17',32,'Mediocentro'),('Adrian Li','1992-10-12',30,'Pivote'),('Steven Mora','1995-05-12',27,'Portero'),('Juan Calderón','1991-12-27',30,'Mediocentro'),('Michael García','1995-04-13',27,'Extremo derecho'),('Sergio Moya','1998-05-13',22,'Mediapunta');

-- Asignación al equipo Costa Rica
INSERT INTO PLAYER_TEAM VALUES (2,21),(2,22),(2,23),(2,24),(2,25),(2,26),(2,27),(2,28),(2,29),(2,30),(2,31),(2,32),(2,33),(2,34),(2,35),(2,36),(2,37),(2,38),(2,39),(2,40);

--Población Jugadores Honduras
-- Asignación al equipo Honduras
INSERT INTO PLAYER_TEAM VALUES (3,21),(3,22),(3,23),(3,24),(3,25),(3,26),(3,27),(3,28),(3,29),(3,30),(3,31),(3,32),(3,33),(3,34),(3,35),(3,36),(3,37),(3,38),(3,39),(3,40);
--Población Jugadores España
INSERT INTO PLAYER_TEAM VALUES (4,21),(4,22),(4,23),(4,24),(4,25),(4,26),(4,27),(4,28),(4,29),(4,30),(4,31),(4,32),(4,33),(4,34),(4,35),(4,36),(4,37),(4,38),(4,39),(4,40);
--Población Jugadores Inglaterra
INSERT INTO PLAYER_TEAM VALUES (5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(5,9),(5,10),(5,11),(5,12),(5,13),(5,14),(5,15),(5,16),(5,17),(5,18),(5,19),(5,20);
--Población Jugadores Chile
INSERT INTO PLAYER_TEAM VALUES (6,1),(6,2),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9),(6,10),(6,11),(6,12),(6,13),(6,14),(6,15),(6,16),(6,17),(6,18),(6,19),(6,20);
--Población Jugadores Japón
INSERT INTO PLAYER_TEAM VALUES (7,1),(7,2),(7,3),(7,4),(7,5),(7,6),(7,7),(7,8),(7,9),(7,10),(7,11),(7,12),(7,13),(7,14),(7,15),(7,16),(7,17),(7,18),(7,19),(7,20);
-- Asignación al equipo Rusia
INSERT INTO PLAYER_TEAM VALUES (8,21),(8,22),(8,23),(8,24),(8,25),(8,26),(8,27),(8,28),(8,29),(8,30),(8,31),(8,32),(8,33),(8,34),(8,35),(8,36),(8,37),(8,38),(8,39),(8,40);

--LOCALES
-- Asignación al equipo Cartago
INSERT INTO PLAYER_TEAM VALUES (9,21),(9,22),(9,23),(9,24),(9,25),(9,26),(9,27),(9,28),(9,29),(9,30),(9,31),(9,32),(9,33),(9,34),(9,35),(9,36),(9,37),(9,38),(9,39),(9,40);
-- Asignación al equipo Saprissa
INSERT INTO PLAYER_TEAM VALUES (10,1),(10,2),(10,3),(10,4),(10,5),(10,6),(10,7),(10,8),(10,9),(10,10),(10,11),(10,12),(10,13),(10,14),(10,15),(10,16),(10,17),(10,18),(10,19),(10,20);
-- Asignación al equipo Heredia
INSERT INTO PLAYER_TEAM VALUES (11,21),(11,22),(11,23),(11,24),(11,25),(11,26),(11,27),(11,28),(11,29),(11,30),(11,31),(11,32),(11,33),(11,34),(11,35),(11,36),(11,37),(11,38),(11,39),(11,40);
-- Asignación al equipo Liga
INSERT INTO PLAYER_TEAM VALUES (12,1),(12,2),(12,3),(12,4),(12,5),(12,6),(12,7),(12,8),(12,9),(12,10),(12,11),(12,12),(12,13),(12,14),(12,15),(12,16),(12,17),(12,18),(12,19),(12,20);

