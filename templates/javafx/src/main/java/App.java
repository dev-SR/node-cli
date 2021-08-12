import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.geometry.Pos;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public class App extends Application {
    static int count;

    @Override
    public void start(Stage stage) throws Exception {

        /**
         * OPTION 1: Building Scene using FXML
         * */
        Parent root = FXMLLoader.load(getClass().getResource("sample.fxml"));
        Scene scene = new Scene(root);
        /**
         * OPTION 2: Building Scene using Java Code
         * */
        // GridPane root = Sample();
        // Scene scene = new Scene(root, 600, 400);

        stage.setScene(scene);
        stage.show();
    }

    public static GridPane Sample() {
        GridPane root = new GridPane();
        root.setAlignment(Pos.CENTER);
        root.setVgap(10);
        root.setHgap(10);

        Label label = new Label("Clicked 0 times");
        Button btn = new Button("Click Me");
        btn.setOnAction(e -> {
            count++;
            label.setText("Clicked " + count + " times");
        });
        root.add(btn, 0, 0);
        root.add(label, 0, 1);
        return root;
    }

    public static void main(String[] args) {
        launch();
    }
}
