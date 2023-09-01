public class getJavaVersion {
    public getJavaVersion() {

    }

    public static void main(String[] args) {
        String version = System.getProperty("java.version");
        System.out.println(version);
    }
}