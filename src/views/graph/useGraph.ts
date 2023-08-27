import { Kind, Relation } from "views/selector/enums"
import { fullData } from "../../data"

const getID=(name: string):string => {
   let id=name;
   if(name.includes(':')){
      const parts = name.split(':');
      id=parts[1];
   }

   if(!id.includes('/')) {
      id =`default/${id}`;
   }

   return id;
}

type IRelation = {
   source: string,
   target: string,
   value: string
}

function useGraph() {
   let entities=[]
   let relations: IRelation[]=[]
   for(const data of fullData) {
      const entity = data.entity;
      entity.id=data.id;
      entities.push(entity);
      if(entity.kind === Kind.Component) {
         const { owner, system, subcomponentOf, providesApis, consumesApis, dependsOn} = entity.spec;
         if(owner) {
            relations.push({source: entity.id,target: getID(owner),value: Relation.ownedBy
            });
         }
         if(system) {
            relations.push({source: getID(system),target: entity.id,value: Relation.hasPart})
         }
         if(subcomponentOf) {
            relations.push({source: getID(subcomponentOf),target: entity.id, value: Relation.hasPart})
         }

         if(providesApis) {
            for(const api of providesApis) {
               relations.push({source: entity.id,target: getID(api), value: Relation.providesAPI});
            }      
         }

         if(consumesApis) {
            for(const api of consumesApis) {
               relations.push({source: entity.id,target: getID(api), value: Relation.consumesAPI});
            }  
         }

         if(dependsOn) {
            for(const ent of dependsOn) {
               relations.push({source: entity.id,target: getID(ent), value: Relation.dependsOn});
            }  
         }


      } else if(entity.kind === Kind.API) {
         const { owner, system} = entity.spec;
         
         if(owner) {
            relations.push({source: entity.id,target: getID(owner),value: Relation.ownedBy
            });
         }

         if(system) {
            relations.push({source: getID(system),target: entity.id,value: Relation.hasPart})
         }
      } else if(entity.kind === Kind.Group) {
         const { parent, children, members} = entity.spec;
         if(parent) {
            relations.push({source: getID(parent),target: entity.id,value: Relation.parentOf})
         }

         if(children) {
            for( const child of children) {
               relations.push({source: entity.id,target: getID(child),value: Relation.parentOf})
            }
         }

         if(members) {
            for( const member of members) {
               relations.push({source: entity.id,target: getID(member),value: Relation.hasMember})
            }
         }

      } else if(entity.kind===Kind.User) {
         const { memberOf } = entity.spec;
         if(memberOf) {
            for( const group of memberOf) {
               relations.push({source: getID(group),target: entity.id,value: Relation.hasMember})
            }
         }
      } else if(entity.kind===Kind.Resource) {
         
      }
   }
}

export default useGraph