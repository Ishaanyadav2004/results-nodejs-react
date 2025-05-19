npm install react-scripts@latest
set NODE_OPTIONS=--openssl-legacy-provider
npm start


  For backend
  node server.js

  
Database sql queries
use vit_results;
CREATE TABLE results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_name VARCHAR(255),
    prn_no VARCHAR(20),
    computer_networks_mse INT,
    computer_networks_ese INT,
    theory_of_computation_mse INT,
    theory_of_computation_ese INT,
    advanced_data_structures_mse INT,
    advanced_data_structures_ese INT,
    operating_systems_mse INT,
    operating_systems_ese INT
);
SELECT* FROM results;
INSERT INTO results (student_name, prn_no, computer_networks_mse, computer_networks_ese, 
                     theory_of_computation_mse, theory_of_computation_ese, 
                     advanced_data_structures_mse, advanced_data_structures_ese, 
                     operating_systems_mse, operating_systems_ese)
VALUES ('John Doe', '1221030001', 25, 60, 28, 55, 22, 48, 27, 63);
