# Maze Visualizer
Build a React WebApp for visualizing maze building and solving algorithms.

##Functionalities
Allows user to:
	- **Move** start and end points for maze solving.
	- **Generate** Mazes using two different maze builders:
		- Prims: Builds a maze one nodes at a time by merging collections of edges until a minimum spanning tree has been created.
		- Kruskel: Builds maze by randomly connecting nodes until a minimum spanning tree is created.
		- Non Perfect: Uses Prims algorithm to generate minimum spanning tree maze, then randomly knocks down walls to introduce loops.
	- **Solve** Mazes using two different approaches:
		- Depth First Search: branch following backtracking algorithm.
		- Breadth First Search: wave like traversal algorithm.
	- **Toggle** the showing of Maze walls.
	- **Scale** the maze size in order to make easier or more complex mazes.
	- **Reset** mazes, so new ones can be built.