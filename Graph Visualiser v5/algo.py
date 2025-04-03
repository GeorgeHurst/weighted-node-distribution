def calculate_positions(self, nodes, orbit_num):
        if not len(nodes):
            return

        current_radius = self.orbit_radius*orbit_num
        max_nodes = math.pi*current_radius/self.node_radius
        angle_increment = 2*math.pi / (len(nodes) if len(nodes) < max_nodes else max_nodes)

        current_angle = angle_increment

        while ((current_angle <= 2*math.pi) and len(nodes)):
            self.node_pos[nodes.pop(0)] = [self.size_x/2 + current_radius*math.cos(current_angle),
                                           self.size_y/2 + current_radius*math.sin(current_angle)]
            print(self.node_pos)
            current_angle += angle_increment

        temp = orbit_num + 1
        self.calculate_positions(nodes, temp)
