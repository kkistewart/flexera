FROM microsoft/dotnet:aspnetcore-runtime
COPY bin/Debug/netcoreapp2.1/publish/ /root/
EXPOSE 5000/tcp
ENTRYPOINT ["dotnet", "/root/codetest.dll"]