// validar()

function pegarDadosUsuarios() {
    return fetch(`/usuarios/pegarMenoresCoberturas/${estado}/${tecnologia}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(resposta => resposta.json())
        .then(res => {
            console.log(res)
            return [res.cidades, res.estados, res.coberturas, res.operadoras, res.tecnologias]
        })
        .catch(error => {
            console.log(`#ERRO ao buscar cobertura: ${error}`);
            return null;
        });
}
`<tr class="user-item">
    <td class="user-info">Naomi</td>
    <td class="user-info">Administrador</td>
    <td class="user-info">
        <div class="container-edit">
            <div class="edit-button"></div>
            <div class="remove-button"></div>
        </div>
    </td>
</tr>`