package br.com.ChatTexto.ChatTexto.dtos;

import br.com.ChatTexto.ChatTexto.Entity.Mensagem;
import lombok.Data;

import java.util.List;

@Data
public class LastMensagem {

    private Long chatId;

    private Mensagem mensagem;
}
