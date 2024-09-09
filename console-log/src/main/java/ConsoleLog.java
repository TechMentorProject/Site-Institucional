import java.util.Calendar;

public class ConsoleLog {
    public static void main(String[] args) throws InterruptedException {
        Integer ano = Calendar.getInstance().get(Calendar.YEAR);
        Integer mesDesformatado = Calendar.getInstance().get(Calendar.MONTH);
        Integer diaDesformatado = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);

        String mes = mesDesformatado.toString();
        if (mesDesformatado.toString().length() == 1) {
            mes = "0" + mesDesformatado;
        }
        String dia = diaDesformatado.toString();
        if (diaDesformatado.toString().length() == 1) {
            dia = "0" + diaDesformatado;
        }

        String ip = "localhost";
        String porta = "3333";
        String ambiente = "produção";
        Integer tempoPausa = 2000;

        System.out.println("""
                
                ######## ########  ######  ##     ##       ##     ## ######## ##    ## ########  #######  ######## \s
                   ##    ##       ##    ## ##     ##       ###   ### ##       ###   ##    ##    ##     ## ##     ##\s
                   ##    ##       ##       ##     ##       #### #### ##       ####  ##    ##    ##     ## ##     ##\s
                   ##    ######   ##       #########       ## ### ## ######   ## ## ##    ##    ##     ## ######## \s
                   ##    ##       ##       ##     ##       ##     ## ##       ##  ####    ##    ##     ## ##   ##  \s
                   ##    ##       ##    ## ##     ##       ##     ## ##       ##   ###    ##    ##     ## ##    ## \s
                   ##    ########  ######  ##     ##       ##     ## ######## ##    ##    ##     #######  ##     ##\s
                """);
        Thread.sleep(tempoPausa);
        System.out.println("""
                ===========================================================================
                %s/%s/%s - %s:%s:%s : Inicializando Aplicação
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND)));
        Thread.sleep(tempoPausa);
        System.out.println("""
                %s/%s/%s - %s:%s:%s : Recuperando dados
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND)));
        Thread.sleep(tempoPausa);
        System.out.println("""
                %s/%s/%s - %s:%s:%s : Inicializando estrutura do site institucional
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND)));
        Thread.sleep(tempoPausa);
        System.out.println("""
                %s/%s/%s - %s:%s:%s : Aplicando CSS no site institucional
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND)));
        Thread.sleep(tempoPausa);
        System.out.println("""
                %s/%s/%s - %s:%s:%s : Inicializando sistema de cadastro e login
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND)));
        Thread.sleep((tempoPausa + 500));
        System.out.println("""
                %s/%s/%s - %s:%s:%s : Aplicação inicializada na rota: http://%s:%s
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND),
                ip, porta));
        Thread.sleep((tempoPausa / 2));
        System.out.println("""
                %s/%s/%s - %s:%s:%s : Rodando a aplicação no ambiente de: %s
                ===========================================================================
                """.formatted(dia, mes, ano,
                Calendar.getInstance().get(Calendar.HOUR),
                Calendar.getInstance().get(Calendar.MINUTE),
                Calendar.getInstance().get(Calendar.SECOND),
                ambiente));
        Thread.sleep((tempoPausa * 2));
    }

}
