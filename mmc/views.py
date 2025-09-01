from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers

def algoritmo_euclides (inicio,fim):
    while fim != 0:
        inicio,fim = fim, inicio % fim
    return inicio


def mmc(inicio, fim):
    resultado = inicio
    for i in range(inicio + 1, fim + 1):
        resultado = abs(resultado *  i) // algoritmo_euclides(resultado, i)
    return resultado


class validarIntervalo(serializers.Serializer):
    inicio = serializers.IntegerField(min_value = 1)
    fim = serializers.IntegerField(min_value = 1)


class MMCView(APIView):
    def post(self, request):
        serializers = validarIntervalo(data = request.data)
        

        if serializers.is_valid():
            inicio  = serializers.validated_data['inicio']
            fim  = serializers.validated_data['fim']

            maxIntervalo = 10
            if (fim - inicio + 1) > maxIntervalo:
                return Response(
                    {"error": f"O intervalo muito grande entre os numeros, Máximo permitido: {maxIntervalo} números"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            resultado = mmc(inicio,fim)
            return Response(resultado, status=status.HTTP_200_OK)
        return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)