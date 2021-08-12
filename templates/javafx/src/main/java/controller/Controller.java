package controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;


public class Controller {
    @FXML
    private Label label;
    int count = 0;

    @FXML
    public void onButtonCLicked(ActionEvent actionEvent) {
        System.out.println(actionEvent);
        count++;
        label.setText("Clicked " + count + " times");
    }
}
