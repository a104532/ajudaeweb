import json
import re
from datetime import datetime

def clean_string(value):
    """Limpa strings removendo espaços extras e verificando valores vazios"""
    if isinstance(value, str):
        value = value.strip()
        return value if value != '' else None
    return value

def parse_date(date_str):
    """Converte strings de data para objetos datetime"""
    if not date_str:
        return None
    try:
        return datetime.strptime(date_str, "%d/%m/%Y %H:%M:%S")
    except ValueError:
        return None

def convert_boolean(value):
    """Converte strings 'Sim'/'Não' para booleanos"""
    if value == "Sim":
        return True
    elif value == "Não":
        return False
    return None

def process_tree_data(tree):
    """Processa os dados de uma árvore individual"""
    processed = {
        "_id": tree["Id"],
        "numero_registo": tree["Número de Registo"],
        "codigo_rua": tree["Código de rua"],
        "rua": clean_string(tree["Rua"]),
        "local": clean_string(tree["Local"]),
        "freguesia": clean_string(tree["Freguesia"]),
        "especie": {
            "nome_comum": clean_string(tree["Espécie"]),
            "nome_cientifico": clean_string(tree["Nome Científico"]),
            "origem": clean_string(tree["Origem"])
        },
        "data_plantacao": clean_string(tree["Data de Plantação"]),  # Poderia ser convertido para date se o formato for conhecido
        "estado": clean_string(tree["Estado"]),
        "caracteristicas": {
            "caldeira": convert_boolean(tree["Caldeira"]),
            "tutor": convert_boolean(tree["Tutor"]),
            "implantacao": clean_string(tree["Implantação"])
        },
        "gestor": clean_string(tree["Gestor"]),
        "data_atualizacao": parse_date(tree["Data de actualização"]),
        "numero_intervencoes": tree["Número de intervenções"]
    }
    
    # Adiciona apenas campos que têm valores
    return {k: v for k, v in processed.items() if v is not None}

def main():
    # Carrega o dataset original
    with open("plantas.json", "r", encoding="utf-8") as f:
        trees = json.load(f)
    
    # Processa cada árvore
    processed_trees = [process_tree_data(tree) for tree in trees]
    
    # Salva o dataset processado
    with open("plantas_clean.json", "w", encoding="utf-8") as f:
        json.dump(processed_trees, f, ensure_ascii=False, indent=4, default=str)
    
    print(f"Processamento concluído. {len(processed_trees)} árvores processadas.")

if __name__ == "__main__":
    main()