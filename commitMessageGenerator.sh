#!/bin/bash
changedFiles=$(echo $(git diff --staged --name-only ) | tr " " ",") 
if [[ $changedFiles == "" ]]
then
  echo "No hay archivos preparados. Debes hacer primero git stage con los archivos que vas a agregar al commit."
  exit 0
fi
flag=0
while [[ flag -eq 0 ]]
do
  flag=1
  read -p "Ingresa el tipo de commit ([B]ugfix, [F]eature, [H]otfix, [C]hore, [O]ther):" -n1 commitTypeInput
  commitTypeUpper=$(echo $commitTypeInput | tr '[:lower:]' '[:upper:]')
  if [[ $commitTypeUpper == "B" ]]
  then
    commitType="Bugfix"
  elif [[ $commitTypeUpper == "F" ]]
  then
    commitType="Feature"
  elif [[ $commitTypeUpper == "H" ]]
  then
    commitType="Hotfix"
  elif [[ $commitTypeUpper == "C" ]]
  then
    commitType="Chore"
  elif [[ $commitTypeUpper == "O" ]]
  then
    commitType="Other"
  elif [[ $commitTypeUpper == "" ]]
  then
    flag=0
    echo "Debes ingresar un tipo de commit"
  else
    flag=0
    echo "\n$commitTypeInput no es una opción válida"
  fi
done
commitMessage="${commitType}(${changedFiles}):"
echo "\n"
flag=0
while [[ flag -eq 0 ]]
do
  flag=1
  read -p "Ingresa la descripción del commit: " description
  if [[ $description == "" ]]
  then
    flag=0
    echo "Debes agregar una descripción"
  fi
done
commitMessage="${commitMessage} ${description}"
read -p "Ingresa comentarios adicionales del commit separados por , (si no hay comentarios adicionales presiona enter): " comments
if [[ $comments != "" ]]
then
  commentsFixed=$(echo $comments | tr , '\n')
  commitMessage="${commitMessage}\n\n${commentsFixed}"
fi
read -p "Breaking changes (Si no hay breaking changes presiona enter): " breaking
if [[ $breaking == "" ]]
then
  commitMessage="${commitMessage}\n\nNo breaking changes."
else
  commitMessage="${commitMessage}\n\nBreaking changes: ${breaking}"
fi
echo "${commitMessage}" | pbcopy
echo "El mensaje para el commit fue copiado al portapapeles"